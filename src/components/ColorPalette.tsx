import React from 'react';
import { ButtonGroup, Button, Flex, Text } from '@chakra-ui/react';

interface ColorPaletteProps {
  selectedColor: string;
  onSelect: (color: string) => void;
}

export const ColorPalette = ({ selectedColor, onSelect }: ColorPaletteProps) => {
  const colors = [
    { name: '红色', value: '#FF0000' },
    { name: '蓝色', value: '#0000FF' },
    { name: '黄色', value: '#FFFF00' },
    { name: '绿色', value: '#00FF00' },
    { name: '紫色', value: '#800080' },
  ];

  return (
    <Flex direction="column" gap={4}>
      <Text fontSize="lg" fontWeight="bold">选择颜色</Text>
      <ButtonGroup spacing={3}>
        {colors.map((color) => (
          <Button
            key={color.value}
            w="60px"
            h="60px"
            bg={color.value}
            borderRadius="full"
            borderWidth={selectedColor === color.value ? '3px' : '2px'}
            borderColor={selectedColor === color.value ? 'blue.400' : 'gray.200'}
            onClick={() => onSelect(color.value)}
            _hover={{ transform: 'scale(1.1)' }}
            aria-label={color.name}
          />
        ))}
      </ButtonGroup>
    </Flex>
  );
};