#!/bin/zsh

set +e
set +x

source ./bin/check_env.sh

gcloud config set project $APP_PROJECT

if [[ $1 != "get" && $1 != "check" && $1 != "init" && $1 != "push" && $1 != "delete" ]]; then
    echo "USAGE: First argument must be get/check/init/push/delete"
    echo
    exit 1
fi


if [[ $1 == "delete" ]]; then
    echo "Are you sure you want to delete all secrets?"
    read answer
    
    if [[ $answer != "yes" ]] && [[ $answer != "y" ]]; then
        exit 1
    fi
fi

SECRETS_DIR="./secrets"


for FILE in `ls $SECRETS_DIR`; do
    
    NAME=${FILE%%.*}
    
    if [[ $1 == "get" ]]; then
      echo "Accessing secret $NAME"
      gcloud secrets versions access "latest" --secret $NAME > $SECRETS_DIR/$FILE
        
    elif [[ $1 == "init" ]]; then
      gcloud beta secrets create $NAME \
        --replication-policy="user-managed" \
        --data-file=$SECRETS_DIR/$FILE \
        --locations="us-central1,us-east4,us-west1"
    
    elif [[ $1 == "push" ]]; then
      gcloud secrets versions add $NAME \
        --data-file=$SECRETS_DIR/$FILE
      
    elif [[ $1 == "delete" ]]; then
      touch /tmp/yes.txt
      echo 'y' > /tmp/yes.txt
      gcloud secrets delete $NAME < /tmp/yes.txt

    elif [[ $1 == "check" ]]; then
      kubectl get secret secrets-manager -o 'go-template={{index .data "$NAME"}}' | base64 -D

    fi
done

