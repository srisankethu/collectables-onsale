import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Grid,
  Typography,
  createStyles,
  withStyles,
} from '@material-ui/core'

const nftStyles = theme =>
  createStyles({
    actionArea: {
      maxWidth: 300,
    },
    nftAddress: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    id: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    tokenId: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    startingPrice: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })

const Nft = ({ classes, id, nftAddress, tokenId, startingPrice }) => (
  <Grid item>
    <Card>
      <CardActionArea className={classes.actionArea}>
        <CardContent>
          <Typography variant="h6" component="h3" className={classes.tokenId}>
            {tokenId || '—'}
          </Typography>
          <Typography color="textSecondary">ID</Typography>
          <Typography component="p" className={classes.id}>
            {id}
          </Typography>
          <Typography color="textSecondary">nftAddress</Typography>
          <Typography component="p" className={classes.nftAddress}>
            {nftAddress}
          </Typography>
          <Typography color="textSecondary">startingPrice</Typography>
          <Typography component="p" className={classes.startingPrice}>
            {startingPrice}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Grid>
)

const StyledNft = withStyles(nftStyles)(Nft)

const nftsStyles = theme =>
  createStyles({
    title: {
      marginTop: theme.spacing.unit * 2,
    },
  })

const Nfts = ({ classes, nfts }) => (
  <Grid container direction="column" spacing={16}>
    <Grid item>
      <Typography variant="title" className={classes.title}>
        {nfts.length} Nfts
      </Typography>
    </Grid>
    <Grid item>
      <Grid container direction="row" spacing={16}>
        {nfts.map(nft => (
          <StyledNft key={nft.id} {...nft} />
        ))}
      </Grid>
    </Grid>
  </Grid>
)

export default withStyles(nftsStyles)(Nfts)
