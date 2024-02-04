import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
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
  test: Scalars['String'];
  users: Array<UserEntity>;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UserInput = {
  name: Scalars['String'];
};

export type LoginRegisMutationVariables = Exact<{
  name: Scalars['String'];
}>;


export type LoginRegisMutation = (
  { __typename?: 'Mutation' }
  & { login_regis: (
    { __typename?: 'UserEntity' }
    & Pick<UserEntity, 'id' | 'name'>
  ) }
);


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
        //const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginRegisMutation, LoginRegisMutationVariables>(LoginRegisDocument, baseOptions);
      }
export type LoginRegisMutationHookResult = ReturnType<typeof useLoginRegisMutation>;
export type LoginRegisMutationResult = Apollo.MutationResult<LoginRegisMutation>;
export type LoginRegisMutationOptions = Apollo.BaseMutationOptions<LoginRegisMutation, LoginRegisMutationVariables>;