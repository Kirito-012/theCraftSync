#!/usr/bin/env bash
# Verifies the S3 -> Cloudinary migration for blog image storage.
# Prints PASS/FAIL per assertion and exits non-zero with the count of failures.
set -uo pipefail
cd "$(dirname "$0")/.."

fails=0
pass() { echo "PASS  $1"; }
fail() { echo "FAIL  $1"; fails=$((fails+1)); }

# 1. No forbidden S3 / aws-sdk references anywhere in app code
if grep -rniE "s3helper|uploadToS3|deleteFromS3|deleteMultipleFromS3|aws-sdk|config/aws|\baws\.s3\b|new AWS\." app 2>/dev/null | grep -v "AWS, Azure" >/tmp/_s3refs.txt; then
  fail "S3/aws references remain in app/:"; cat /tmp/_s3refs.txt
else
  pass "no S3/aws references in app/"
fi

# 2. aws-sdk removed from package.json and node_modules
grep -q '"aws-sdk"' package.json && fail "aws-sdk still in package.json" || pass "aws-sdk absent from package.json"
[ -d node_modules/aws-sdk ] && fail "aws-sdk still installed" || pass "aws-sdk not installed"

# 3. cloudinary present as dependency and installed
grep -q '"cloudinary"' package.json && pass "cloudinary in package.json" || fail "cloudinary missing from package.json"
[ -d node_modules/cloudinary ] && pass "cloudinary installed" || fail "cloudinary not installed"

# 4. Helper + config files exist
[ -f app/utils/cloudinaryHelper.js ] && pass "cloudinaryHelper.js exists" || fail "cloudinaryHelper.js missing"
[ -f app/config/cloudinary.js ] && pass "cloudinary config exists" || fail "cloudinary config missing"
[ ! -f app/utils/s3Helper.js ] && pass "s3Helper.js deleted" || fail "s3Helper.js still present"
[ ! -f app/config/aws.js ] && pass "aws.js deleted" || fail "aws.js still present"

# 5. POST route uploads to Cloudinary
grep -q "uploadToCloudinary" app/api/blogs/route.js && pass "POST route uses uploadToCloudinary" || fail "POST route not wired to Cloudinary"

# 6. PUT/DELETE route uploads + cleans up on Cloudinary
grep -q "uploadToCloudinary" app/api/blogs/\[id\]/route.js && pass "PUT route uses uploadToCloudinary" || fail "PUT route not wired to Cloudinary"
grep -q "deleteFromCloudinary" app/api/blogs/\[id\]/route.js && pass "[id] route cleans up via deleteFromCloudinary" || fail "[id] route missing Cloudinary cleanup"

# 7. Blog model stores imagePublicId
grep -q "imagePublicId" app/models/Blog.js && pass "Blog model has imagePublicId field" || fail "Blog model missing imagePublicId"

# 8. Legacy controller migrated
grep -q "uploadToCloudinary" app/controllers/blogControllers.js && pass "controller uses uploadToCloudinary" || fail "controller not migrated"

# 9. next.config allows res.cloudinary.com (blog pages can render Cloudinary images)
grep -q "res.cloudinary.com" next.config.ts && pass "next.config allows res.cloudinary.com" || fail "next.config missing cloudinary remotePattern"

# 10. .env has Cloudinary keys
if [ -f .env ] && grep -q "CLOUDINARY_CLOUD_NAME" .env && grep -q "CLOUDINARY_API_KEY" .env && grep -q "CLOUDINARY_API_SECRET" .env; then
  pass ".env has Cloudinary keys"
else
  fail ".env missing Cloudinary keys"
fi

echo "-----"
echo "FAILURES: $fails"
exit $fails
