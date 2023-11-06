import Greeting from '../components/Greeting';
import SortableTable from '../Task-Samuel/Table'

export default function Home() {
  const data = [
    {
      "id": 1,
      "first_name": "Marrilee",
      "last_name": "Le Clercq",
      "country": "United States"
    },

    {
      "id": 2,
      "first_name": "Samuel",
      "last_name": "Ortega Gonzalez",
      "country": "United States"
    },

    {
      "id": 3,
      "first_name": "Pau",
      "last_name": "Caire",
      "country": "Spain"
    },

    {
      "id": 4,
      "first_name": "Takuto",
      "last_name": "Ono",
      "country": "Japan"
    }
  ]

  return (
    <div>
      <SortableTable data={data}/>
    </div>
  )
}
