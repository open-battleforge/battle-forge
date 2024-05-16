import BuildIcon from '@mui/icons-material/Build';
import ExtensionIcon from '@mui/icons-material/Extension';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import {
  Box, Card, CardActionArea, CardContent, Divider, Grid, Stack, Typography, useMediaQuery
} from "@mui/material";
import Container from "@mui/material/Container";
import { useTheme } from '@mui/material/styles';
import logo from "assets/battle_forged_wide.png";
import Gallery from 'components/gallery';
import { shuffle } from "lodash";
import React from "react";
import ChessPawn from 'mdi-material-ui/ChessPawn';
import ReactMarkdown from "react-markdown";
import { useNavigate } from 'react-router';
import { colors } from 'utils/colors';
import { getHeaders } from "utils/images";
import { MaterialRenderer } from "utils/markdown";
import bgImage from 'assets/background.jpg';

export default function Home() {
  const navigate = useNavigate();
  const theme = useTheme();
  const images = React.useMemo(() => shuffle(getHeaders()), []);
  const iconSize = '60px';
  const mrender = MaterialRenderer();
  const fullScreen = useMediaQuery(theme.breakpoints.up("md"));
  const CARDS = [
    {
      name: "Rules",
      icon: <MenuBookIcon style={{ fontSize: iconSize }} />,
      text: "Read any of the core rules in their digital format here.",
      to: "/rules",
      color: colors.red.import[800],
    },
    {
      name: "Games",
      icon: <ExtensionIcon style={{ fontSize: iconSize }} />,
      text: "Browse all of the available game systems to experience.",
      to: "/games",
      color: colors.green.import[900],
    },
    {
      name: "Rosters",
      icon: <FeaturedPlayListIcon style={{ fontSize: iconSize }} />,
      text: "Create and browse rosters to use during your games.",
      to: "/lists",
      color: colors.brown.import[500],
    }
  ];

  return (
    <>
      <div
        style={{
          backgroundImage: `url(${bgImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: 'column', mt: -2 }} style={{ width: "100%", background: "rgba(0,0,0,0.7)" }}>
          <Box sx={{ display: "flex", flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <img
              flex={1}
              className={"logo"}
              src={logo}
              alt="logo"
            />
          </Box>
        </Box>
      </div>
      <Container>
        <Grid
          container
          rowSpacing={2}
          sx={{ mt: 1 }}
          columnSpacing={2}
        >
          {CARDS.map((card) => (
            <Grid item sm={6} md={4}>
              <Card>
                <CardActionArea
                  onClick={() =>
                    card.toAbs
                      ? window.open(card.toAbs, "_blank")
                      : navigate(card.to)
                  }
                >
                  <CardContent>
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Box sx={{ mr: 2, color: theme.palette.primary.main }}>{card.icon}</Box>
                      <Stack>
                        <Typography variant="h4" component="div">
                          {card.name}
                        </Typography>
                        <Typography align="left">{card.text}</Typography>
                      </Stack>
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
        </Container>
        <Divider sx={{ pb: 2 }} />
        <Container>
        <Box sx={{ mt: 3 }}>
          <Typography variant={fullScreen ? 'h1' : 'h3'} paragraph sx={{ mb: '0.5em', borderBottom: `5px solid ${theme.palette.primary.main}` }}>
            Any Miniatures, One Ruleset
          </Typography>
          <Typography style={{ fontSize: 16 }} variant="body1" paragraph>
            Battle Forge is a tactical miniature wargame designed for either
            small skirmish engagements or large all out battles. It allows you
            to experience your favorite settings and miniatures in a common set of rules. 
            Our simple to learn but deep to master rules provide
            a fair set of rules for both competitive and casual players alike.
            We encourage you to use our tools to help you 
            create your own armies and units and share them easily.
          </Typography>
          <Typography style={{ fontSize: 16 }} variant="body1" paragraph>
            With regular balance updates and direct player-driven feedback, we can respond to issues with the
            system in a timely manner and continue to improve. We invite you to come give the rules a try for
            free and see what you think. Any feedback can be directed to our
            Discord server linked above. We hope you enjoy it!
          </Typography>
        </Box>
      </Container>
      <Divider sx={{ py: 2 }} />
      <Container>
        <Grid
          container
          rowSpacing={1}
          sx={{ mt: 2 }}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          <Grid item md={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <div style={{ padding: "5px" }}>
                <ChessPawn style={{ fontSize: '100px', color: theme.palette.primary.main }} />
              </div>
              <Typography variant="h5" gutterBottom>Strategic Gameplay</Typography>
              <Typography style={{ fontSize: 16 }} paragraph>
                The rules employ alternating activation with a twist, in that
                both players risk a certain amount of "Shock", pushing their
                units to their limit each round to attempt to seize the
                initiative. Additionally, units may be deployed in hidden
                positions to attempt to outsmart or outbluff your opponent.
              </Typography>
              <Typography style={{ fontSize: 16 }} paragraph>
                The Shock system introduces a Command and Control element to
                ensure that you will have to adapt to the changing battlefield
                and use your Leaders to their full effect to keep your units
                fighting at full efficiency. Crucially, these mechanics will
                rarely cause you to lose a unit's entire activation, only weaken
                them to avoid frustration.
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <div style={{ padding: "5px" }}>
                <PhoneAndroidIcon
                  style={{ fontSize: '100px', color: theme.palette.primary.main }}
                />
              </div>
              <Typography variant="h5" gutterBottom>Living Rules</Typography>
              <Typography style={{ fontSize: 16 }} paragraph>
                The project lives here on its digital hub and is quickly and
                easily updated to ensure the latest rules and updates are
                available in one place without having to download additional FAQ
                and Errata documents.
              </Typography>
              <Typography style={{ fontSize: 16 }} paragraph>
                The digital hub is also designed to be used as a reference while
                playing and is mobile-friendly with all features available on
                both desktop and mobile devices.
              </Typography>
            </Box>
          </Grid>
          <Grid item md={4}>
            <Box
              display="flex"
              alignItems="center"
              justifyContent="center"
              flexDirection="column"
            >
              <div style={{ padding: "5px" }}>
                <BuildIcon
                  style={{ fontSize: '100px', color: theme.palette.primary.main }}
                />
              </div>
              <Typography variant="h5" gutterBottom>Fully Mod-able</Typography>
              <Typography style={{ fontSize: 16 }} paragraph>
                All of our released game settings configuration files are fully
                downloadable and editable with our developed tools to allow you
                to create your own units, factions or even entirely new game
                settings.
              </Typography>
              <Typography style={{ fontSize: 16 }} paragraph>
                The games are all about community-driven content and regular
                balance feedback. The tools we've created allow us to very
                rapidly make balance changes that will apply to all settings and
                datasheets as well as your custom ones so you get the latest
                adjustments quickly.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
      <Divider sx={{ py: 2 }} />
      <Container>
        <Gallery
          images={images.map((img) => ({ imgPath: `/images/headers/${img.img}`, label: <ReactMarkdown components={mrender} className="rule-text" children={img.credit} /> }))}
          maxHeight={500}
        />
      </Container>
    </>
  );
}
