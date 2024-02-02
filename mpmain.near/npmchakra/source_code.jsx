import {
  Button, ButtonGroup,
  ChakraProvider
} from '@chakra-ui/react';

interface Props {
  message?: string;
}

export default function BWEComponent({ message = "Hello" }: Props) {
  return (
    <ChakraProvider>
      <Button colorScheme='blue'>Button</Button>
    </ChakraProvider>
  );
}