#!/bin/bash
my_bool=true # or my_bool="true"

if [ "$my_bool" = true ]; then
    echo "single brackets, single equal, true"
fi

if [ "$my_bool" = "true" ]; then
    echo "single brakcet, single qual, true string"
fi

if [[ "$my_bool" = true ]]; then
    echo "double brackets, single equal, true"
fi
if [[ "$my_bool" = "true" ]]; then
    echo "double brackets, single equal, true string"
fi
if [[ "$my_bool" == true ]]; then
    echo "double brackets, double equal, true"
fi

if [[ "$my_bool" == "true" ]]; then
    echo "double brackets, double equal, true string"
fi
