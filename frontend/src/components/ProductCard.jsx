import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
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
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";

const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");

  const { deleteProduct, updateProduct } = useProductStore();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isOpen1, onOpen: onOpen1, onClose: onClose1 } = useDisclosure();

  const handleDeleteProduct = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (!success) {
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
    onClose1();
  };

  const handleUpdateProduct = async (pid, updatedProductData) => {
    const { success, message } = await updateProduct(pid, updatedProductData);
    if (!success) {
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
        description: "Product updated successfully",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
    onClose();
  };

  return (
    <>
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
            <IconButton
              icon={<EditIcon />}
              colorScheme="blue"
              onClick={onOpen}
              aria-label="Edit product"
            />
            <IconButton
              icon={<DeleteIcon />}
              colorScheme="red"
              onClick={onOpen1}
              aria-label="Delete product"
            />
          </HStack>
        </Box>
      </Box>

      {/* Update Product Modal */}
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay bg="blackAlpha.300" /> {/* Explicit bg for visibility fallback */}
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <Input
                placeholder="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
              />
              <Input
                placeholder="Product Price"
                type="number"
                value={updatedProduct.price}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, price: e.target.value })
                }
              />
              <Input
                placeholder="Image URL"
                value={updatedProduct.image}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, image: e.target.value })
                }
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

      {/* Delete Confirmation Modal */}
      <Modal isOpen={isOpen1} onClose={onClose1} isCentered>
        <ModalOverlay bg="blackAlpha.300" /> {/* Explicit bg for visibility fallback */}
        <ModalContent>
          <ModalHeader>Delete Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to delete {product.name}?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="red" mr={3} onClick={() => handleDeleteProduct(product._id)}>
              Delete
            </Button>
            <Button variant="ghost" onClick={onClose1}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProductCard;