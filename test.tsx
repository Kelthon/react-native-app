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
  const [input, setInput] = useState<string>('');
  const [tag, setTag] = useState<string>('@all');
  const [data, setData] = useState<ResearchType[]>([]);

  const setExpr = (text: string) => {
    const regExpr = /@[a-zA-z]+?:\s?.{3}?/i;
    text = text.toLowerCase();

    if (regExpr.test(text)) {
      let expr = input.split(':');

      setTag(expr[0]);
      setInput(expr[1]);
    }

    setTag('@all');
    setInput(text);
  };

  const FilterResearches = () => {
    switch (tag) {
      case '@autor':
        data.filter(research => {
          research.autores.forEach(autor => {
            if (autor === input) {
              return research;
            }
          });
        });
        break;
    }
    return;
  };

  const fetchData = async () => {
    await axios.get<ResearchType[]>(apiUrl).then(response => {
      setData(response.data);
    });
  };

  return (
    <View>
      <Text>CONPESQ 2023</Text>
      <TextInput placeholder="Pesquisar" onChangeText={setExpr} />
      <Button title="Buscar Trabalhos" onPress={fetchData} />
      <ScrollView>
        <Text>
          Pesquisar por {tag}: {input}
        </Text>
        {data.length > 0 ? (
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
