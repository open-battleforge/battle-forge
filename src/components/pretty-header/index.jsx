import {
  Box, Typography
} from "@mui/material";
import bgImage from 'assets/background.jpg';

export const PrettyHeader = (props) => {
  const { text } = props;
  return (
    <div
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box sx={{ display: "flex", flexDirection: 'column', mt: -2 }} style={{ width: "100%", background: "rgba(0,0,0,0.7)" }}>
        {!!text && <Typography variant="h2" align="center" sx={{ mb: 2 }} className={"pretty-header"}>
          <span className="pretty-header-header">{text}</span>
        </Typography>}
      </Box>
    </div>
  );
}