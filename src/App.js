import axios from 'axios';
import React, { Component } from 'react';
import ApolloClient, {gql, InMemoryCache} from 'apollo-boost';
import {ApolloProvider, Query} from 'react-apollo';
import Nfts from './components/Nfts'
import {
  Grid,
  LinearProgress,
  Card,
  CardContent,
  Typography,
} from '@material-ui/core';
import './App.css';

const client = new ApolloClient({
  uri: "https://api.thegraph.com/subgraphs/name/srisankethu/opensea-auction",
  cache: new InMemoryCache(),
})

const AUCTIONS_CREATED = gql`
query Auctions {
auctionCreateds {
id
nftAddress
tokenId
startingPrice
}
}
`;


class App extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount() {
    axios.get('https://google.com')
  }

  render() {
  return (
    <ApolloProvider client={client}>
    <div className="App">
    <Grid container direction="column">
        <Grid item>
            <Grid container>
            <Query query={AUCTIONS_CREATED}>
            {({ loading, error, data }) => {
                if (loading) return <LinearProgress variant="query" style={{ width: '100%' }} />;
                if (error) return `Error! ${error.message}`;

                data.auctionCreateds.map(auction => (
                  axios.get('https://api.opensea.io/api/v1/asset/' + auction.nftAddress + '/' + auction.tokenId).then(result => (
                    console.log(result)
                  )).catch(error => (
                    console.log("Failed")
                  ))
                ));
                return (
                  <Grid item>
                      <Grid container direction="row" spacing={16}>
                        {data.auctionCreateds.map(auction => (
                          <Grid item>
                          <Card>
                            <CardContent>
                              <Typography variant="h6" component="h3" className={auction.tokenId}>
                                {auction.tokenId || '—'}
                              </Typography>
                              <Typography color="textSecondary">ID</Typography>
                              <Typography component="p" className={auction.id}>
                                {auction.id}
                              </Typography>
                              <Typography color="textSecondary">nftAddress</Typography>
                              <Typography component="p" className={auction.nftAddress}>
                                {auction.nftAddress}
                              </Typography>
                              <Typography color="textSecondary">startingPrice</Typography>
                              <Typography component="p" className={auction.startingPrice}>
                                {auction.startingPrice}
                              </Typography>
                            </CardContent>
                          </Card>
                          </Grid>
                        ))}
                    </Grid>
                  </Grid>
                );
            }}
            </Query>
            </Grid>
        </Grid>
    </Grid>
    </div>
    </ApolloProvider>
  );
}
}

export default App;
