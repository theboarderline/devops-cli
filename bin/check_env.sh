#!/bin/zsh

if [[ ! $APP_CODE ]]; then
    echo "Must set APP_CODE in bash env"
    exit 1
fi

if [[ ! $APP_PROJECT ]]; then
    echo "Must set APP_PROJECT in bash env"
    exit 1
fi

if [[ ! $GKE_PROJECT ]]; then
    echo "Must set GKE_PROJECT in bash env"
    exit 1
fi

if [[ ! $REGION ]]; then
    echo "Must set REGION in bash env"
    exit 1
fi

if [[ ! $ZONE ]]; then
    echo "Must set ZONE in bash env"
    exit 1
fi

if [[ $LIFECYCLE != "ops" && $LIFECYCLE != "dev" && $LIFECYCLE != "test" && $LIFECYCLE != "stage" && $LIFECYCLE != "prod" ]]; then
    echo "Must set LIFECYCLE to ops/dev/test/stage/prod in bash env"
    exit 1
fi
