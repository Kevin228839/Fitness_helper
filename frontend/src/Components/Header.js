import { Flex, Spacer, Box, Divider, Avatar } from '@chakra-ui/react';

const Header = () => {
  return (
    <>
      <Flex bg="WhiteAlpha 200" w="100%" h="80px">
        <Box w="20%" display="flex" alignItems="center" pl="80px">
          <Avatar src="/icon/gym.png" w="30px" h="30px"/>
        </Box>
        <Spacer />
        <Box w="20%" display="flex" alignItems="center" justifyContent="end" pr="80px">
          <Avatar src="/icon/user.png" w="30px" h="30px"/>
        </Box>
      </Flex>
      <Divider />
    </>
  );
};

export default Header;
