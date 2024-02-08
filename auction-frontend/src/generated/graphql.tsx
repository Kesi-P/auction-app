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
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuctionEntity = {
  __typename?: 'AuctionEntity';
  id: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  startPrice: Scalars['Float'];
  terminateAt: Scalars['DateTime'];
};

export type AuctionInput = {
  userId: Scalars['String'];
  auctionId: Scalars['String'];
};

export type AuctionInputnew = {
  userId: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  category: ItemCategory;
  startPrice: Scalars['Float'];
  terminate: Scalars['DateTime'];
  status: AuctionStatus;
};

export type AuctionResponse = {
  __typename?: 'AuctionResponse';
  auction?: Maybe<Array<AuctionEntity>>;
};

export enum AuctionStatus {
  OnGoing = 'ON_GOING',
  OnHold = 'ON_HOLD',
  Finished = 'FINISHED'
}

export type BidEntity = {
  __typename?: 'BidEntity';
  id: Scalars['String'];
  price: Scalars['Float'];
  isMaximum: Scalars['Boolean'];
};

export type BidInput = {
  userId: Scalars['String'];
  auctionId: Scalars['String'];
  price: Scalars['Float'];
  isMax: Scalars['Boolean'];
};

export type BidResponse = {
  __typename?: 'BidResponse';
  errors?: Maybe<Array<FieldError>>;
  bid?: Maybe<BidEntity>;
  sellerId?: Maybe<Scalars['String']>;
};


export type FieldError = {
  __typename?: 'FieldError';
  message: Scalars['String'];
};

export enum ItemCategory {
  Vehicle = 'VEHICLE',
  RealEstate = 'REAL_ESTATE',
  Baby = 'BABY',
  Art = 'ART',
  Music = 'MUSIC',
  Device = 'DEVICE',
  Agriculture = 'AGRICULTURE',
  Animals = 'ANIMALS',
  Sport = 'SPORT',
  Fashion = 'FASHION',
  Furniture = 'FURNITURE',
  Other = 'OTHER'
}

export type Mutation = {
  __typename?: 'Mutation';
  login_regis: UserEntity;
  regisAuction: AuctionEntity;
  getMaxAndAddMax: BidResponse;
  regisBid: BidResponse;
};


export type MutationLogin_RegisArgs = {
  input: UserInput;
};


export type MutationRegisAuctionArgs = {
  input: AuctionInputnew;
};


export type MutationGetMaxAndAddMaxArgs = {
  input: AuctionInput;
};


export type MutationRegisBidArgs = {
  inputBid: BidInput;
};

export type Query = {
  __typename?: 'Query';
  users: Array<UserEntity>;
  getAllAuctions: AuctionResponse;
};

export type UserEntity = {
  __typename?: 'UserEntity';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type UserInput = {
  name: Scalars['String'];
};

export type GetMaxAndAddMaxMutationVariables = Exact<{
  userId: Scalars['String'];
  auctionId: Scalars['String'];
}>;


export type GetMaxAndAddMaxMutation = (
  { __typename?: 'Mutation' }
  & { getMaxAndAddMax: (
    { __typename?: 'BidResponse' }
    & Pick<BidResponse, 'sellerId'>
    & { bid?: Maybe<(
      { __typename?: 'BidEntity' }
      & Pick<BidEntity, 'id' | 'price'>
    )> }
  ) }
);

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

export type RegisAuctionMutationVariables = Exact<{
  userId: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
  category: ItemCategory;
  status: AuctionStatus;
  startPrice: Scalars['Float'];
  terminateAt: Scalars['DateTime'];
}>;


export type RegisAuctionMutation = (
  { __typename?: 'Mutation' }
  & { regisAuction: (
    { __typename?: 'AuctionEntity' }
    & Pick<AuctionEntity, 'id' | 'title' | 'description' | 'startPrice' | 'terminateAt'>
  ) }
);

export type RegisBidMutationVariables = Exact<{
  userId: Scalars['String'];
  auctionId: Scalars['String'];
  price: Scalars['Float'];
  isMax: Scalars['Boolean'];
}>;


export type RegisBidMutation = (
  { __typename?: 'Mutation' }
  & { regisBid: (
    { __typename?: 'BidResponse' }
    & { bid?: Maybe<(
      { __typename?: 'BidEntity' }
      & Pick<BidEntity, 'id' | 'price' | 'isMaximum'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'message'>
    )>> }
  ) }
);

export type GetAllAuctionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAuctionsQuery = (
  { __typename?: 'Query' }
  & { getAllAuctions: (
    { __typename?: 'AuctionResponse' }
    & { auction?: Maybe<Array<(
      { __typename?: 'AuctionEntity' }
      & Pick<AuctionEntity, 'id' | 'title' | 'description' | 'startPrice' | 'terminateAt'>
    )>> }
  ) }
);


export const GetMaxAndAddMaxDocument = gql`
    mutation GetMaxAndAddMax($userId: String!, $auctionId: String!) {
  getMaxAndAddMax(input: {userId: $userId, auctionId: $auctionId}) {
    bid {
      id
      price
    }
    sellerId
  }
}
    `;
export type GetMaxAndAddMaxMutationFn = Apollo.MutationFunction<GetMaxAndAddMaxMutation, GetMaxAndAddMaxMutationVariables>;

/**
 * __useGetMaxAndAddMaxMutation__
 *
 * To run a mutation, you first call `useGetMaxAndAddMaxMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useGetMaxAndAddMaxMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [getMaxAndAddMaxMutation, { data, loading, error }] = useGetMaxAndAddMaxMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      auctionId: // value for 'auctionId'
 *   },
 * });
 */
export function useGetMaxAndAddMaxMutation(baseOptions?: Apollo.MutationHookOptions<GetMaxAndAddMaxMutation, GetMaxAndAddMaxMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<GetMaxAndAddMaxMutation, GetMaxAndAddMaxMutationVariables>(GetMaxAndAddMaxDocument, options);
      }
export type GetMaxAndAddMaxMutationHookResult = ReturnType<typeof useGetMaxAndAddMaxMutation>;
export type GetMaxAndAddMaxMutationResult = Apollo.MutationResult<GetMaxAndAddMaxMutation>;
export type GetMaxAndAddMaxMutationOptions = Apollo.BaseMutationOptions<GetMaxAndAddMaxMutation, GetMaxAndAddMaxMutationVariables>;
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
export const RegisAuctionDocument = gql`
    mutation RegisAuction($userId: String!, $title: String!, $description: String!, $category: ItemCategory!, $status: AuctionStatus!, $startPrice: Float!, $terminateAt: DateTime!) {
  regisAuction(
    input: {userId: $userId, title: $title, description: $description, category: $category, status: $status, startPrice: $startPrice, terminate: $terminateAt}
  ) {
    id
    title
    description
    startPrice
    terminateAt
  }
}
    `;
export type RegisAuctionMutationFn = Apollo.MutationFunction<RegisAuctionMutation, RegisAuctionMutationVariables>;

/**
 * __useRegisAuctionMutation__
 *
 * To run a mutation, you first call `useRegisAuctionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisAuctionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [regisAuctionMutation, { data, loading, error }] = useRegisAuctionMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      category: // value for 'category'
 *      status: // value for 'status'
 *      startPrice: // value for 'startPrice'
 *      terminateAt: // value for 'terminateAt'
 *   },
 * });
 */
export function useRegisAuctionMutation(baseOptions?: Apollo.MutationHookOptions<RegisAuctionMutation, RegisAuctionMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisAuctionMutation, RegisAuctionMutationVariables>(RegisAuctionDocument, options);
      }
export type RegisAuctionMutationHookResult = ReturnType<typeof useRegisAuctionMutation>;
export type RegisAuctionMutationResult = Apollo.MutationResult<RegisAuctionMutation>;
export type RegisAuctionMutationOptions = Apollo.BaseMutationOptions<RegisAuctionMutation, RegisAuctionMutationVariables>;
export const RegisBidDocument = gql`
    mutation RegisBid($userId: String!, $auctionId: String!, $price: Float!, $isMax: Boolean!) {
  regisBid(
    inputBid: {userId: $userId, auctionId: $auctionId, price: $price, isMax: $isMax}
  ) {
    bid {
      id
      price
      isMaximum
    }
    errors {
      message
    }
  }
}
    `;
export type RegisBidMutationFn = Apollo.MutationFunction<RegisBidMutation, RegisBidMutationVariables>;

/**
 * __useRegisBidMutation__
 *
 * To run a mutation, you first call `useRegisBidMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisBidMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [regisBidMutation, { data, loading, error }] = useRegisBidMutation({
 *   variables: {
 *      userId: // value for 'userId'
 *      auctionId: // value for 'auctionId'
 *      price: // value for 'price'
 *      isMax: // value for 'isMax'
 *   },
 * });
 */
export function useRegisBidMutation(baseOptions?: Apollo.MutationHookOptions<RegisBidMutation, RegisBidMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisBidMutation, RegisBidMutationVariables>(RegisBidDocument, options);
      }
export type RegisBidMutationHookResult = ReturnType<typeof useRegisBidMutation>;
export type RegisBidMutationResult = Apollo.MutationResult<RegisBidMutation>;
export type RegisBidMutationOptions = Apollo.BaseMutationOptions<RegisBidMutation, RegisBidMutationVariables>;
export const GetAllAuctionsDocument = gql`
    query GetAllAuctions {
  getAllAuctions {
    auction {
      id
      title
      description
      startPrice
      terminateAt
    }
  }
}
    `;

/**
 * __useGetAllAuctionsQuery__
 *
 * To run a query within a React component, call `useGetAllAuctionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllAuctionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllAuctionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetAllAuctionsQuery(baseOptions?: Apollo.QueryHookOptions<GetAllAuctionsQuery, GetAllAuctionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllAuctionsQuery, GetAllAuctionsQueryVariables>(GetAllAuctionsDocument, options);
      }
export function useGetAllAuctionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllAuctionsQuery, GetAllAuctionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllAuctionsQuery, GetAllAuctionsQueryVariables>(GetAllAuctionsDocument, options);
        }
export type GetAllAuctionsQueryHookResult = ReturnType<typeof useGetAllAuctionsQuery>;
export type GetAllAuctionsLazyQueryHookResult = ReturnType<typeof useGetAllAuctionsLazyQuery>;
export type GetAllAuctionsQueryResult = Apollo.QueryResult<GetAllAuctionsQuery, GetAllAuctionsQueryVariables>;