#!/bin/bash

source ./bin/check_env.sh


if [[ $1 != "install" && $1 != "upgrade" && $1 != "delete" ]]; then
    echo "USAGE: First argument must be install/upgrade/delete"
    echo
    exit 1
fi


DEFAULT_FILE="./kubernetes/default.yaml"
ENV_FILE="./kubernetes/$LIFECYCLE.yaml"

helm repo update

if [[ $1 == "delete" ]]; then
    echo "Deleting $APP_CODE $LIFECYCLE"
    helm delete $APP_CODE --namespace $APP_CODE

else
    echo "Installing $APP_CODE $LIFECYCLE"
    helm upgrade -i $APP_CODE walker-charts/web-app \
      --namespace $APP_CODE --create-namespace \
      -f $DEFAULT_FILE \
      -f $ENV_FILE \
      $3
fi


