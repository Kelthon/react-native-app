import {Text, TextInput, Button} from '@react-native-material/core';
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
      <Text>{research.id}</Text>
      <Text>{research.titulo}</Text>
      <Text>{research.autores}</Text>
      <Text>{research.area}</Text>
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
