import { Flex, Spacer, Box, Divider, Image } from '@chakra-ui/react';

const Header = () => {
  return (
    <>
      <Flex bg="WhiteAlpha 200" w="100%" h="80px">
        <Box w="20%" display="flex" alignItems="center" pl="80px">
          <Image src="https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/weightlifter.png" w="40px" h="40px"/>
        </Box>
        <Spacer />
        <Box w="20%" display="flex" alignItems="center" justifyContent="end" pr="80px">
          <Image src="https://myawsfoodbucket01.s3.ap-southeast-2.amazonaws.com/user.png" w="40px" h="40px"/>
        </Box>
      </Flex>
      <Divider />
    </>
  );
};

export default Header;
