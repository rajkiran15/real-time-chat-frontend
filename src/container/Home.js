import { Container, Box } from "@mui/material";
import CreateChat from "../components/CreateChat";

const Home = () => {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="90vh"
      >
        <CreateChat />
      </Box>
    </Container>
  );
};

export default Home;
