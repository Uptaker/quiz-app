import xlsx from 'xlsx'
import type {QuizInfo, QuizQuestion} from '../types'
import {QuizSheetColumn} from '../types'
import fs from 'fs'
import {QuizRoute} from '../routes/QuizRoute'

export class SheetsService {
  public static read(file: { destination: string; filename: string; originalname: string }) {
    const uuid = file.destination.split('/')[2]
    const extension = file.filename.split('.').pop()
    const spreadsheet = xlsx.readFile(`./storage/${uuid}/source.${extension}`)
    const names = spreadsheet.SheetNames
    let data: QuizQuestion[] | any[] = xlsx.utils.sheet_to_json(spreadsheet.Sheets[names[0]])
    data.forEach(j => {
      j.question = j[QuizSheetColumn.QUESTIONS]
      delete j[QuizSheetColumn.QUESTIONS]
      j.answer = j[QuizSheetColumn.ANSWERS]?.toString()
      delete j[QuizSheetColumn.ANSWERS]
      if (j[QuizSheetColumn.PICTURE]) {
        j.pictureName = j[QuizSheetColumn.PICTURE]
        delete j[QuizSheetColumn.PICTURE]
      } else if (j[QuizSheetColumn.PICTURES]) {
        j.pictureName = j[QuizSheetColumn.PICTURES]
        delete j[QuizSheetColumn.PICTURES]
      }
    });
    this.write(uuid, JSON.stringify(data))

    const utf8name = Buffer.from(file.originalname, 'latin1').toString('utf8')
    const name = utf8name.slice(0, utf8name.lastIndexOf('.'))
      .replaceAll('-', ' ').replaceAll('_', ' ').trim()
    QuizRoute.addToList({name, uuid, createdAt: Date.now(), size: data.length} as QuizInfo)
  }

  public static write(uuid: string, jsonStringified: string) {
    fs.writeFileSync(`./storage/${uuid}/data.json`, jsonStringified)
  }
}