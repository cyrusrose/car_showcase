import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
    schema: process.env.GRAPHQL_API,
    // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
    documents: ["src/**/*.{ts,tsx}"],
    generates: {
        "./src/generated/": {
            preset: "client",
            plugins: [],
            presetConfig: {
                gqlTagName: "gql"
            }
        }
    },
    ignoreNoDocuments: true
}

export default config
