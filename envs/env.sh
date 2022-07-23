
source ./envs/gcp.sh
source ./envs/app.sh

export LIFECYCLE_LETTER="${LIFECYCLE:0:1}"

export GITHUB_ORG="theboarderline"
export PROJ_IDENTIFIER='platform'

export GKE_PROJECT="$LIFECYCLE_LETTER-$PROJ_IDENTIFIER-gke-project"
export APP_PROJECT="$NAMESPACE-app-project"

export CLUSTER="central-cluster"

export REGION=us-central1
export ZONE=$REGION-a


if [[ $FAILOVER ]]; then
  export CLUSTER="east-cluster"

  export REGION=us-east4
  export ZONE=$REGION-b
fi

export IS_LOCAL=True

gcloud config set account $GCP_EMAIL

./bin/auth.sh

