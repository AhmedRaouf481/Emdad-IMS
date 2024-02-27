import { Injectable } from '@nestjs/common';
import { ItemRepo } from './item.repo';
import * as exceljs from 'exceljs'
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class ItemService {
  constructor(private itemRepo: ItemRepo) {

  }
  async create(createItemDto: CreateItemDto) {
    try {
      const item = await this.itemRepo.create_item(createItemDto)
      return item
    } catch (error) {
      throw error
    }
  }

  extractData(rows) {
    let objects = []
    let skipNextRow = false
    let name = ''

    const indexOf = (arr, q) => arr.findIndex(item => item?.toLowerCase().includes(q?.toLowerCase()));
    const indexOfCode = indexOf(rows[1], 'code')
    const indexOfPhoto = indexOf(rows[1], 'photo')
    const indexOfDimension = indexOf(rows[1], 'dimension')
    const indexOfWeight = indexOf(rows[1], 'weight')
    const indexOfQty = indexOf(rows[1], 'order qty')
    const indexOfCapacity = indexOf(rows[1], 'qty @ box')
    const indexOfDesciption = indexOf(rows[1], 'description')
    const indexOfPrice = indexOf(rows[1], 'price')

    const rowsData = rows.slice(2, 100)

    const handleDesc = (desc: string) => {
      let color = ''
      let description = ''
      let descArr = desc.split('-')
      let lastIndex = descArr.length - 1
      // console.log(descArr[lastIndex].length);

      if (descArr[lastIndex].trim().length <= 6) {
        color = descArr[lastIndex].trim()
        descArr.splice(lastIndex, 1)
      }
      description = descArr.join(",").trim()

      return { color, description }
    }

    for (let i = 0; i < rowsData.length; i++) {
      const row = rowsData[i];
      let counter = 0;

      // Check if the row should be skipped
      if (skipNextRow) {
        skipNextRow = false;
        continue;
      }

      // Check if the row is the Name row
      (row as string[]).forEach(cell => {
        if (cell) {
          counter++;
        }
      })

      if (counter === 1) {
        name = row[2]

        // Extract other data from the next row
        const nextRow = rowsData[i + 1];
        const { color, description } = handleDesc(nextRow[indexOfDesciption])
        objects.push({
          name,
          code: nextRow[indexOfCode],
          description,
          dimension: nextRow[indexOfDimension],
          qty: nextRow[indexOfQty],
          weight: nextRow[indexOfWeight],
          capacity: nextRow[indexOfCapacity],
          price: nextRow[indexOfPrice],
          color
        });

        // Skip the next row in the iteration
        skipNextRow = true;
        continue
      }
      const { color, description } = handleDesc(row[indexOfDesciption])

      objects.push({
        name,
        code: row[indexOfCode],
        description,
        dimension: row[indexOfDimension],
        qty: row[indexOfQty],
        weight: row[indexOfWeight],
        capacity: row[indexOfCapacity],
        price: row[indexOfPrice],
        color

      });

    }
    return objects
  }

  async processImportedFile(file: Express.Multer.File) {
    const workbook = new exceljs.Workbook();
    await workbook.xlsx.load(file.buffer);
    const worksheet = workbook.worksheets[0]; // Assuming the data is in the first worksheet

    const rows = worksheet.getSheetValues();

    let objects = this.extractData(rows)

    try {
      // console.log(dataToSave);
      const data = objects.map(rec => {
        const { capacity, ...data } = rec;
        return data
      })
      // const savedData = await this.itemRepo.createMany(data);
      return {
        success: true, data: rows.slice(1, 60), objects
      };
    } catch (error) {
      throw error
    }
  }

  async findAll() {
    try {
      const item = await this.itemRepo.getAll()
      return item
    } catch (error) {
      throw error
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.itemRepo.getByID(id)
      return item
    } catch (error) {
      throw error
    }
  }

  async update(id: string, updateItemDto: UpdateItemDto) {
    try {
      const item = await this.itemRepo.update(id, updateItemDto)
      return item
    } catch (error) {
      throw error
    }
  }

  async remove(id: string) {
    try {
      const item = await this.itemRepo.delete(id)
      return item
    } catch (error) {
      throw error
    }
  }
}
