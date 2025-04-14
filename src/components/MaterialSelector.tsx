import React from 'react';
import { Button, SimpleGrid, Box, Heading } from '@chakra-ui/react';

type Material = {
  id: string;
  name: string;
  image: string;
  strength: number;
};

interface MaterialSelectorProps {
  onSelect: (material: Material) => void;
}

export const MaterialSelector = ({ onSelect }: MaterialSelectorProps) => {
  const materials: Material[] = [
    { id: 'paper', name: '宣纸', image: '/images/crane.png', strength: 3 },
    { id: 'nylon', name: '尼龙布', image: '/images/goldfish.png', strength: 5 },
    { id: 'plastic', name: '塑料膜', image: '/images/swallowtail.png', strength: 4 },
  ];

  return (
    <Box>
      <Heading as="h3" size="md" mb={4}>选择材料</Heading>
      <SimpleGrid columns={3} spacing={4}>
        {materials.map((material) => (
          <Button 
            key={material.id}
            height="100px"
            bgImage={`url(${material.image})`}
            bgSize="contain"
            bgRepeat="no-repeat"
            bgPosition="center"
            onClick={() => onSelect(material)}
            variant="outline"
            _hover={{ transform: 'scale(1.05)' }}
          >
            {material.name}
          </Button>
        ))}
      </SimpleGrid>
    </Box>
  );
};