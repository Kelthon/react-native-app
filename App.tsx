import {Text, TextInput, Button, Flex, Box, Spacer, Surface, Divider} from '@react-native-material/core';
import React, {useState} from 'react';
import {View, ScrollView} from 'react-native';
import axios from 'axios';

const apiUrl =
  'https://sci01-ter-jne.ufca.edu.br/cppgi/api/avaliacoes/2370/1/TODAS';

type ResearchType = {
  id: number;
  autores: string[];
  area: string;
  titulo: string;
  finalizados: number;
  esperando: number;
  reprovados: number;
  aprovados: number;
  situacao: number;
};
function FiltrarTrabalhos(): JSX.Element {
  return (
    <View>
      <TextInput />
      <Button title="Filtrar" />
      <Button title="Cancelar" />
    </View>
  );
}

function ResearchItem(research: ResearchType): JSX.Element {
  return (
    <View>
      <Flex>
        <Box h={30} style={{backgroundColor:'lightblue'}}>
          <Spacer>
           <Text variant="subtitle1">Título:</Text>
          </Spacer>
        </Box>
        <Box h ={120}>
          <Text variant="h6">[{research.id}] {research.titulo}</Text>
        </Box>
        <Box h={30} style={{backgroundColor:'lightblue'}}>
          <Text variant="subtitle1">Autores:</Text>
        </Box>
      </Flex>
      <Box>
      <Surface elevation={2} category="medium" style={{width:400, height:200}}>
      <Text>{research.autores.split(',').map(a => {
        return a;
      })}</Text>
      <Divider style={{marginTop:60}} leadingInset={16}>
      <Text>{research.area}</Text>
      </Divider>
      </Surface>
      </Box>
      <Text>{research.finalizados}</Text>
      <Text>{research.esperando}</Text>
      <Text>{research.reprovados}</Text>
      <Text>{research.aprovados}</Text>
      <Text>{research.situacao}</Text>
    </View>
  );
}

function App(): JSX.Element {
  const [data, setData] = useState<ResearchType[]>([]);

  const fetchData = async () => {
    await axios.get<ResearchType[]>(apiUrl).then(response => {
      setData(response.data);
    });
  };

  return (
    <View>
      <Text>CONPESQ 2023</Text>
      <Button title="Buscar Trabalhos" onPress={fetchData} />
      <FiltrarTrabalhos />
      <ScrollView>
        {data ? (
          data.map(item => {
            return ResearchItem(item);
          })
        ) : (
          <Text>Trabalhos não encontrados</Text>
        )}
      </ScrollView>
    </View>
  );
}

export default App;
