#!/bin/bash

for filename in ./public/images/*.png; do
    convert "$filename" -strip "$filename"
done

for filename in ./public/images/*.jpg; do
    convert "$filename" -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB "$filename"
done

for filename in ./public/images/*.jpeg; do
    convert "$filename" -sampling-factor 4:2:0 -strip -quality 85 -interlace JPEG -colorspace RGB "$filename"
done
