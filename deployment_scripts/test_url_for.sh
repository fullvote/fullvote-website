#!/bin/sh

if [ $(git grep '="/\?assets' | wc -l) -gt 1 ]
then
    echo "missing urlFor" 1>&2
    exit 1
fi
