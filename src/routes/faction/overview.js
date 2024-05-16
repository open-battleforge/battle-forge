import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {
  Box,
  CardHeader, ListItem, ListItemButton, ListItemText, Typography
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { get, sortBy } from "lodash";
import React from "react";
import { getTextColor, hexToRgb } from "utils/colors";

export const Overview = (props) => {
  const { faction, nameFilter } = props;
  const { color: factionColor } = faction;
  const textColor = factionColor
    ? getTextColor(hexToRgb(factionColor))
    : "white";
  const background = faction.background;
  const description = faction.description;
  const strengths = faction.strengths;
  const weaknesses = faction.weaknesses;
  const powers = get(faction, "buyLinks", []).filter((list) =>
    nameFilter
      ? list.name.toLowerCase().includes(nameFilter.toLowerCase())
      : true
  );
  const sortedPowers = sortBy(powers, (power) => power.name);
  return (
    <Box sx={{ mt: 2 }}>
      {!background &&
        !description &&
        !strengths &&
        !weaknesses &&
        !sortedPowers && (
          <div>
            <p>{`No information available...`}</p>
          </div>
        )}

      {!!description && (
        <Card
          sx={{
            border: `2px solid ${factionColor}`,
            mb: 2,
          }}
        >
          <CardHeader
            sx={{ backgroundColor: factionColor, color: textColor, py: 1 }}
            title={
              <Typography variant="h5" component="div">
                {"Overview"}
              </Typography>
            }
          />
          <CardContent>{description}</CardContent>
        </Card>
      )}
      {/* {!!background && <div className="unit-card" style={{ marginBottom: '15px', borderColor: factionColor }}>
        <div style={thStyle} className="unit-card-title">
          <h4>{'Background'}</h4>
        </div>
        <div className="unit-card-body">
          {background}
        </div>
      </div>} */}
      {/* {!!strengths && <div>
        <h4>{'Strengths'}</h4>
        <p>{strengths}</p>
        <hr />
      </div>}
      {!!weaknesses && <div>
        <h4>{'Weaknesses'}</h4>
        <p>{weaknesses}</p>
        <hr />
      </div>} */}
      {!!sortedPowers && !!sortedPowers.length && (
        <Card
          sx={{
            m: 0,
            border: `2px solid ${factionColor}`,
          }}
        >
          <CardHeader
            sx={{ backgroundColor: factionColor, color: textColor, py: 1 }}
            title={
              <Typography variant="h5" component="div">
                {"Model Makers"}
              </Typography>
            }
          />
          <CardContent style={{ padding: 0 }}>
            {sortedPowers.map((list) => (
              <ListItem
                sx={{ p: 0 }}
                key={list.name}
              >
                <ListItemButton onClick={() => window.open(list.link, "_blank")}>
                  <ListItemText
                    id={list.name}
                    primary={list.name}
                    secondary={list.description}
                  />
                  <ShoppingCartIcon />
                </ListItemButton>
              </ListItem>
            ))}
          </CardContent>
        </Card>
      )}
    </Box>
  );
};
