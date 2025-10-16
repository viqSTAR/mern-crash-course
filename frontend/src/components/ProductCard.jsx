import { DeleteIcon, EditIcon, useToast } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
  Text,
  Modal,
  useDisclosure,
  ModalOverlay,
  VStack,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  Input,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

// import { useState } from "react";

const ProductCard = ({ product }) => {
   const [updatedProduct, setUpdatedProduct] = useState(product); // State to hold the updated product data
  const textColor = useColorModeValue("gray.600", "gray.200"); // Get the current text color based on color mode
  const bg = useColorModeValue("white", "gray.800"); // Get the current background color based on color mode

  const {deleteProduct, updateProduct} = useProductStore(); // Get the deleteProduct hook from the store
  const toast = useToast();
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {isOpen1, onOpen1, onClose1} = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const{success,message} = await deleteProduct(pid);
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }; // Implement your own logic to delete the product

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const {success,message} = await updateProduct(pid, updatedProduct);
    onClose();
    if(!success){
      toast({
        title: "Error",
        description: message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } else {
      toast({
        title: "Success",
        description: "product updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  }

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
      bg={bg}
    >
      
        <Image
          src={product.image}
          alt={product.name}
          w="full"
          h={48}
          objectFit="cover"
        />


      <Box p={4}>
        <Heading as="h3" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          ${product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen}/>
          <IconButton icon={<DeleteIcon />} onClick={onOpen1} colorScheme="red" />
        </HStack>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>\
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input 
                placeholder='Product Name'
                name='name'
                value={updatedProduct.name}
                onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
              />
              <Input 
                placeholder='Product Price'
                type='number'
                name='price'
                value={updatedProduct.price}
                onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
              />
              <Input 
                placeholder='Image URL'
                name='image'
                value={updatedProduct.image}
                onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
              />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
              Update
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Modal isOpen={isOpen1} onClose={onClose1}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Are you sure you want to delete {product.name}?
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => {handleDeleteProduct(product._id); onClose1();}}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
