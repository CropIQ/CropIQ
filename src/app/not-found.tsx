import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Link from "next/link";

async function NotFound() {
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "background.default",
        color: "text.primary",
        flexDirection: {xs: "column", md: "row"},
        gap: 4,
      }}
    >
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: "4rem", md: "6rem" },
          fontWeight: "bold",
          color: "primary.main",
        }}
      >
        404
      </Typography>

      <Divider
        // orientation="vertical"
        variant="middle"
        sx={{
          orientation: { xs: "horizontal", md: "vertical" },
          borderColor: "divider",
          borderWidth: 2,
          borderHeight: { xs: 2, md: 5 },
        }}
      />

      <Box sx={{ textAlign: "left" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ mb: 3, color: "text.secondary" }}>
          The page you're looking for doesn't exist.
        </Typography>
        <Button
          component={Link}
          href="/"
          variant="contained"
          size="large"
          sx={{
            width: { xs: "100%", md: "auto" },
          }}
        >
          Go Home
        </Button>
      </Box>
    </Box>
  );
}

export default NotFound;