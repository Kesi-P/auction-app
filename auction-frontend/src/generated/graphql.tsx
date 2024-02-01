import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  login_regis: UserEntity;
};


export type MutationLogin_RegisArgs = {
  input: UserInput;
};

export type Query = {
  __typename?: 'Query';
  test: Scalars['String']['output'];
  users: Array<UserEntity>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['String']['output'];
  name: Scalars['String']['output'];
};

export type UserInput = {
  name: Scalars['String']['input'];
};

export type LoginRegisMutationVariables = Exact<{
  name: Scalars['String']['input'];
}>;


export type LoginRegisMutation = { __typename?: 'Mutation', login_regis: { __typename?: 'UserEntity', id: string, name: string } };


export const LoginRegisDocument = gql`
    mutation LoginRegis($name: String!) {
  login_regis(input: {name: $name}) {
    id
    name
  }
}
    `;
export type LoginRegisMutationFn = Apollo.MutationFunction<LoginRegisMutation, LoginRegisMutationVariables>;

/**
 * __useLoginRegisMutation__
 *
 * To run a mutation, you first call `useLoginRegisMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginRegisMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginRegisMutation, { data, loading, error }] = useLoginRegisMutation({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useLoginRegisMutation(baseOptions?: Apollo.MutationHookOptions<LoginRegisMutation, LoginRegisMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginRegisMutation, LoginRegisMutationVariables>(LoginRegisDocument, options);
      }
export type LoginRegisMutationHookResult = ReturnType<typeof useLoginRegisMutation>;
export type LoginRegisMutationResult = Apollo.MutationResult<LoginRegisMutation>;
export type LoginRegisMutationOptions = Apollo.BaseMutationOptions<LoginRegisMutation, LoginRegisMutationVariables>;