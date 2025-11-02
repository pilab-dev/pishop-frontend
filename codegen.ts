import { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  schema: './src/lib/client/graphql/**/*.graphql',
  documents: './src/lib/client/queries/**/*.ts',
  generates: {
    './src/lib/client/graphql/generated.ts': {
      plugins: [
        'typescript',
        'typescript-operations'
      ],
      config: {
        withHooks: false,
        withHOC: false,
        withComponent: false,
        avoidOptionals: {
          field: true,
          inputValue: false,
          object: false,
          defaultValue: false,
        },
        scalars: {
          Time: 'string',
          JSON: 'Record<string, unknown>',
          Upload: 'File',
        },
        // Modern Apollo Client patterns
        apolloReactHooksImportFrom: '@apollo/client/react',
        apolloReactCommonImportFrom: '@apollo/client',
        apolloReactHocImportFrom: '@apollo/client',
        // Better naming for hooks
        namingConvention: {
          typeNames: 'change-case#pascalCase',
          enumValues: 'change-case#upperCase',
        },
        // Use const assertions for better TypeScript
        constEnums: true,
        // Better fragment handling
        dedupeFragments: true,
      },
    },
  },
  hooks: {
    afterOneFileWrite: ['prettier --write'],
  },
}

export default config
