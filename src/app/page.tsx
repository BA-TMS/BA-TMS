import Table from './components/jmtable'
import Input from './components/jminput';
import Button from './components/jmbutton';
import { bookData } from './components/bookdata';

const BOOKCOLS = ['author', 'title', 'subject', 'language'];
const COLORLIST = ['pink', 'yellow', 'red', 'blue', 'green', 'black'];
const BUTTONLABEL = 'Change Color';
const PLACEHOLDER = 'Enter one of pink, yellow, red, blue, green, or black';
const INPUTLABEL = 'Enter color:';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>Color Picker</h1>
      <Input label={INPUTLABEL} placeholder={PLACEHOLDER}/>
      <Button label={BUTTONLABEL} options={COLORLIST}/>
      <h1>V. Useful Info About Some Books</h1>
      <section>
        <Table columns={BOOKCOLS} tableData={bookData} />
      </section>
    </main>
  )
}
