#!/usr/bin/env bash
set -euo pipefail

WORKSPACE_ROOT="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
GENERATED_SOURCE="$(dirname -- "$WORKSPACE_ROOT")/clean_start/test_results/expected/generate_typescript_from_liana_via_pareto/liana"
SCHEMA_SOURCE="$(dirname -- "$WORKSPACE_ROOT")/clean_start/instance/liana/.liana/schema.slna"
GENERATED_DEST="$WORKSPACE_ROOT/pareto_liana/src/schemas/liana_next_schema/current_generated"
SCHEMA_TEMPLATE="$WORKSPACE_ROOT/vscode_extension/liana_authoring_environment_template/.liana/schema.slna"
SCHEMA_TEST_FIXTURE="$WORKSPACE_ROOT/vscode_extension/test/fixtures/latest_liana/.liana/schema.slna"
SIGNATURE_DEST="$WORKSPACE_ROOT/pareto_liana/src/schemas/liana_next_schema/schema_signature.ts"
ARTIFACT_SOURCE="$(dirname -- "$WORKSPACE_ROOT")/clean_start/meta/shared/src/sealed_artifact"
ARTIFACT_DEST="$WORKSPACE_ROOT/pareto_liana/src/shared/sealed_artifact"

SCHEMA_SIGNATURE="$(node "$WORKSPACE_ROOT/scripts/liana_signature.cjs" "$SCHEMA_SOURCE" "$ARTIFACT_SOURCE")"

rm -rf -- "$WORKSPACE_ROOT/pareto_liana/src/schemas/liana_next_schema/generated"
rm -rf -- "$WORKSPACE_ROOT/pareto_liana/src/schemas/liana_next_schema/next_generated"
rm -rf -- "$WORKSPACE_ROOT/pareto_liana/dist/schemas/liana_next_schema/generated"
rm -rf -- "$WORKSPACE_ROOT/pareto_liana/dist/schemas/liana_next_schema/next_generated"
rm -rf -- "$WORKSPACE_ROOT/pareto_liana/dist/schemas/liana_next_schema/current_generated"
rm -rf -- "$GENERATED_DEST"
cp -a -- "$GENERATED_SOURCE" "$GENERATED_DEST"

mkdir -p -- "$(dirname -- "$ARTIFACT_DEST")"
rm -rf -- "$ARTIFACT_DEST"
rm -rf -- "$WORKSPACE_ROOT/pareto_liana/dist/shared/sealed_artifact"
cp -a -- "$ARTIFACT_SOURCE" "$ARTIFACT_DEST"

cp -- "$SCHEMA_SOURCE" "$SCHEMA_TEMPLATE"
cp -- "$SCHEMA_SOURCE" "$SCHEMA_TEST_FIXTURE"
printf "export const schema_signature = '%s'\n" "$SCHEMA_SIGNATURE" > "$SIGNATURE_DEST"
