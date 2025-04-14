import React from 'react';
import { useState } from 'react';
import { KiteDesigner } from './components/KiteDesigner';
import { MaterialSelector } from './components/MaterialSelector';
import { ColorPalette } from './components/ColorPalette';
import { Box, Button, Heading, HStack, VStack } from '@chakra-ui/react';
import { DownloadIcon } from '@chakra-ui/icons';
import html2canvas from 'html2canvas';
import { Preview3D } from './components/Preview3D';

export default function App() {
  const [design, setDesign] = useState({
    shape: 'diamond',
    materials: [],
    dimensions: { width: 100, height: 120 },
    colors: {}
  });

  const handleMaterialSelect = (material) => {
    setDesign(prev => ({
      ...prev,
      materials: [...prev.materials, material.id]
    }));
  };

  const handleDownload = async () => {
    const canvas = await html2canvas(document.querySelector('.design-container'));
    const link = document.createElement('a');
    link.download = 'kite-design.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleColorSelect = (color) => {
    setDesign(prev => ({
      ...prev,
      colors: { ...prev.colors, [Object.keys(prev.colors).length]: color }
    }));
  };

  return (
    <Box p={8} maxW="1200px" mx="auto">
      <Heading as="h1" mb={8} color="teal.600" textAlign="center">
        成都市凤凰小学校风筝工坊
      </Heading>
      
      <VStack spacing={8} align="stretch">
        <HStack spacing={8} align="start">
          <Box flex={1}>
            <Heading size="md" mb={4}>2D设计视图</Heading>
            <KiteDesigner />
          </Box>
          <Box flex={1}>
            <Heading size="md" mb={4}>3D预览</Heading>
            <Preview3D design={design} />
          </Box>
        </HStack>
        
        <Button 
          colorScheme="teal" 
          onClick={handleDownload}
          leftIcon={<DownloadIcon />}
        >
          导出设计图
        </Button>
        
        <MaterialSelector onSelect={handleMaterialSelect} />
        <ColorPalette selectedColor={Object.values(design.colors).pop()} onSelect={handleColorSelect} />
      </VStack>
    </Box>
  );
}