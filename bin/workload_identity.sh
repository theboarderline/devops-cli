#!/bin/zsh

source ./bin/check_env.sh


LIFECYCLES=(
  "o"
  "d"
  "t"
  "s"
  "p"
)

for CYCLE in ${LIFECYCLES[@]}; do
  GKE_PROJECT="$CYCLE-$PROJ_IDENTIFIER-gke-project"

  gcloud iam service-accounts add-iam-policy-binding \
    --project $APP_PROJECT \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:$GKE_PROJECT.svc.id.goog[$NAMESPACE/$APP_CODE-sa]" \
    $NAMESPACE-workload@$APP_PROJECT.iam.gserviceaccount.com
done
