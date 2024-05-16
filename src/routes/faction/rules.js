import { Box, Card, CardContent, CardHeader, Typography } from "@mui/material";
import { RuleList } from "components/roster/rule-list";
import { sortBy } from "lodash";
import React from "react";
import { getTextColor, hexToRgb } from "utils/colors";

export const Rules = (props) => {
  const { data, faction, nameFilter } = props;
  const { color: factionColor } = faction;
  const textColor = factionColor
    ? getTextColor(hexToRgb(factionColor))
    : "white";
  const units = data.getUnits(faction);
  const weapons = data
    .getRules(units, faction)
    .filter((strategy) =>
      nameFilter
        ? strategy.name.toLowerCase().includes(nameFilter.toLowerCase())
        : true
    );
  const weaponsSorted = sortBy(weapons, "name");
  return (
    <Box sx={{ mt: 2 }}>
      {!weapons.length && <p>{"No rules found..."}</p>}
      {!!weapons.length && (
        <div className="two-columns">
          {weaponsSorted.map((rule, index) => (
            <div style={{ breakInside: "avoid-column" }} key={index}>
              <Card
                className="no-break"
                sx={{
                  border: `2px solid ${factionColor}`,
                  mb: 2,
                }}
              >
                <CardHeader
                  sx={{
                    backgroundColor: factionColor,
                    color: textColor,
                    py: 1,
                  }}
                  title={
                    <Typography fontWeight="bold" variant="h6" component="div">
                      {rule.name}
                    </Typography>
                  }
                />
                <CardContent>
                  <RuleList faction={faction} rules={[rule]} showName={false} />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      )}
    </Box>
  );
};
