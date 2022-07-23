
CHART ?= ./charts/web-app
LIFECYCLE ?= ops


all: dep install
clean: delete

dep:
	helm dep update ${CHART}

install:
	helm upgrade -i ${NAMESPACE} ${CHART} -f ${CHART}/values/${LIFECYCLE}.yaml -n ${NAMESPACE} --create-namespace

local:
	kubectl config use-context rancher-desktop || exit 1
	helm upgrade -i ${NAMESPACE} ${CHART} -f ${CHART}/values/${LIFECYCLE}.yaml -n ${NAMESPACE} --create-namespace --set web-app.local=true --set web-app.secrets.enabled=false

dry:
	helm template ${NAMESPACE} ${CHART} -f ${CHART}/values/${LIFECYCLE}.yaml

dry-local:
	helm template ${NAMESPACE} ${CHART} -f ${CHART}/values/${LIFECYCLE}.yaml --set web-app.local=true --set web-app.secrets.enabled=false

delete:
	helm delete ${NAMESPACE} -n ${NAMESPACE}

