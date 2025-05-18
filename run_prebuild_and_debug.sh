#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status.

# Shift all arguments to ignore them if any are passed by EAS Build unexpectedly
shift $#

# Run expo prebuild
echo "Running npx expo prebuild --platform android --clean"
npx expo prebuild --platform android --clean

# List contents of android directory
echo "Listing android directory contents:"
node listFilesInDir.js ./android

# List contents of android/app directory
echo "Listing android/app directory contents:"
node listFilesInDir.js ./android/app

echo "Prebuild and debug script finished successfully." 