import { Sync } from "@mui/icons-material";
import {
  Button,
  CardHeader,
  Checkbox,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Radio,
  RadioGroup,
  Typography,
  useTheme,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { useLocalStorage } from "hooks/use-localstorage";
import ReactMarkdown from "react-markdown";
import { getRandomItem, getRandomItems } from "utils/math";
import React from "react";
import { DataContext } from "hooks";
import { DataAPI, mergeGlobalData } from "utils/data";
import { PrettyHeader } from "components/pretty-header";
import { get } from 'lodash';

export function MissionGenerator(props) {
  const [{ data: nope, appState, setAppState, userPrefs }] =
    React.useContext(DataContext);
  const showBeta = userPrefs?.showBeta;
  const nameFilter = appState?.searchText;
  const gameTypesRaw = get(nope, 'gameData.gameTypes', {});
  const gamesUnsorted = Object.values(get(nope, `gameData.games`, {})).filter((game) => game.version && Number(game.version)).filter((game) => showBeta ? true : game.version && Number(game.version) >= 1);
  const gameTypes = [...Object.keys(gameTypesRaw).filter((gameType) => gamesUnsorted.filter((game) => game.gameType === gameType).length)];
  const [gameTypeSelection, setGameTypeSelection] = useLocalStorage(
    "mission_generator_gameType",
    gameTypes[0]
  );
  const globalData = mergeGlobalData({ gameType: gameTypeSelection }, nope);
  const data = DataAPI({}, globalData);
  React.useEffect(() => {
    setAppState({
      enableSearch: true,
    });
    return () => {
      setAppState({
        enableSearch: false,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userPrefs.developerMode]);
  const theme = useTheme();
  const missions = data
    .getMissionScenarios()
    .filter((mission) =>
      nameFilter
        ? mission.name.toLowerCase().includes(nameFilter.toLowerCase())
        : true
    );
  const weathers = data.getMissionWeather();
  const secondaries = data.getMissionSecondaries();
  const [randomMission, setRandomMission] = useLocalStorage(
    "mission_generator_randomMission",
    getRandomItem(missions)
  );
  const [randomWeather, setRandomWeather] = useLocalStorage(
    "mission_generator_randomWeather",
    getRandomItem(weathers)
  );
  const [randomSecondary, setRandomSecondary] = useLocalStorage(
    "mission_generator_randomSecondary",
    getRandomItems(secondaries, 3)
  );
  const [enableWeather, setEnableWeather] = useLocalStorage(
    "mission_generator_enableWeather",
    false
  );
  const generateNewMission = () => {
    setRandomMission(getRandomItem(missions));
    setRandomWeather(getRandomItem(weathers));
    setRandomSecondary(getRandomItems(secondaries, 3));
  };
  return (
    <>
      <PrettyHeader text="Scenarios" />
      <Container sx={{ mt: 2 }}>
        <Card
          sx={{
            border: `2px solid ${theme.palette.primary.main}`,
            mb: 2,
          }}
        >
          <CardHeader
            sx={{
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.getContrastText(theme.palette.primary.main),
              p: 1,
            }}
            title={
              <Typography variant="h5" component="div" align="center">
                Options
              </Typography>
            }
          />
          <CardContent>
            <FormControl>
              <RadioGroup
                row
                aria-label="gender"
                name="row-radio-buttons-group"
                onChange={(event) =>
                  setGameTypeSelection(event.target.value)
                }
                value={gameTypeSelection}
              >
                {gameTypes?.map((gameType, index) => (
                  <FormControlLabel
                    key={index}
                    value={gameType}
                    control={<Radio />}
                    label={gameTypesRaw[gameType]?.name}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={enableWeather}
                    onChange={() => setEnableWeather(!enableWeather)}
                  />
                }
                label="Twist"
              />
            </FormGroup>
            {/* <FormGroup check inline>
          <Label style={{ display: 'inline' }}>
            <Input type="checkbox" title="" style={{ marginLeft: '5px' }} color="primary" checked={enableCondition} onChange={() => setEnableCondition(!enableCondition)} />
            {'Fighting Condition'}
          </Label>
        </FormGroup> */}
            <Button
              variant="contained"
              onClick={generateNewMission}
              startIcon={<Sync />}
            >
              New Scenario
            </Button>
          </CardContent>
        </Card>
        {!randomMission && (
          <>
            <div
              className="rule-card unit-card"
              style={{
                marginBottom: "15px",
                borderColor: theme.palette.primary.main,
              }}
            >
              <div
                className="unit-card-title"
                style={{
                  backgroundColor: theme.palette.primary.main,
                  color: theme.palette.getContrastText(
                    theme.palette.primary.main
                  ),
                }}
              >
                <h5>None Found</h5>
              </div>
              <div className="unit-card-body">
                No missions found. Try rengerating...
              </div>
            </div>
          </>
        )}
        {!!randomMission && (
          <>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              <Grid item sx={{ mb: 2 }} md={6}>
                <Card
                  sx={{
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <CardHeader
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.getContrastText(
                        theme.palette.primary.main
                      ),
                      p: 1,
                    }}
                    title={
                      <Typography variant="h5" component="div" align="center">
                        {randomMission.name}
                      </Typography>
                    }
                  />
                  <CardMedia
                    component="img"
                    image={randomMission.map}
                    alt={randomMission.name}
                  />
                  <CardContent>
                    <Typography variant="body" color="text.primary">
                      <ReactMarkdown
                        className="rule-text"
                        style={{ breakInside: "avoid-column" }}
                        children={randomMission.victory_conditions}
                      />
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item sx={{ mb: 2 }} md={6}>
                <Card
                  sx={{
                    border: `2px solid ${theme.palette.primary.main}`,
                  }}
                >
                  <CardHeader
                    sx={{
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.getContrastText(
                        theme.palette.primary.main
                      ),
                      p: 1,
                    }}
                    title={
                      <Typography variant="h5" component="div" align="center">
                        Secondary Objectives
                      </Typography>
                    }
                  />
                  <CardContent>
                    {randomSecondary.map((secondary) => (
                      <div className="width-100">
                        <Typography variant="h5" component="div" gutterBottom>
                          {secondary.name}
                        </Typography>
                        <div style={{ marginBottom: "0.5em" }}>
                          <ReactMarkdown
                            className="rule-text font-italic"
                            style={{ breakInside: "avoid-column" }}
                            children={secondary.description}
                          />
                        </div>
                        <ReactMarkdown
                          className="rule-text"
                          style={{ breakInside: "avoid-column" }}
                          children={secondary.rules}
                        />
                        <Divider />
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </Grid>
              {!!enableWeather && (
                <Grid item sx={{ mb: 2 }} md={12}>
                  <Card
                    sx={{
                      border: `2px solid ${theme.palette.primary.main}`,
                    }}
                  >
                    <CardHeader
                      sx={{
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.getContrastText(
                          theme.palette.primary.main
                        ),
                      }}
                      title={
                        <Typography variant="h5" component="div" align="center">
                          Twist
                        </Typography>
                      }
                    />
                    <CardContent>
                      <Typography variant="h5" component="div" gutterBottom>
                        {randomWeather.name}
                      </Typography>
                      <div style={{ marginBottom: "0.5em" }}>
                        <ReactMarkdown
                          className="rule-text font-italic"
                          style={{ breakInside: "avoid-column" }}
                          children={randomWeather.description}
                        />
                      </div>
                      <ReactMarkdown
                        className="rule-text"
                        style={{ breakInside: "avoid-column" }}
                        children={randomWeather.rules}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </>
        )}
      </Container>
    </>
  );
}
