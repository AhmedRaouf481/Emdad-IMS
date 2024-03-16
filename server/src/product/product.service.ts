import { Injectable } from '@nestjs/common';
import * as exceljs from 'exceljs'
import { ProductRepo } from './product.repo';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductService {
    constructor(private productRepo: ProductRepo) {

    }
    async create(createProductDto: CreateProductDto) {
        try {
            const product = await this.productRepo.create(createProductDto)
            return product
        } catch (error) {
            throw error
        }
    }

    extractData(rows) {
        let objects = []
        let skipNextRow = false
        let category: Record<string, any[]> = {}
        let name = ''

        const indexOf = (arr, q) => arr.findIndex(product => product?.toLowerCase().includes(q?.toLowerCase()));
        const indexOfCode = indexOf(rows[1], 'code')
        const indexOfPhoto = indexOf(rows[1], 'photo')
        const indexOfDimension = indexOf(rows[1], 'dimension')
        const indexOfWeight = indexOf(rows[1], 'weight')
        const indexOfQty = indexOf(rows[1], 'order qty')
        const indexOfCapacity = indexOf(rows[1], 'qty @ box')
        const indexOfDesciption = indexOf(rows[1], 'description')
        const indexOfPrice = indexOf(rows[1], 'price')

        const rowsData = rows.slice(2)

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

            if (row[indexOfCode] == null && rowsData[i + 1][indexOfCode] == null) {
                category
                break;
            }
            let counter = 0;

            // Check if the row should be skipped
            // if (skipNextRow) {
            //     skipNextRow = false;
            //     continue;
            // }

            // Check if the row is the Name row
            (row as string[]).forEach(cell => {
                if (cell) {
                    counter++;
                }
            })

            if (counter === 1) {

                name = row[2]
                category[name] = []
                // // Extract other data from the next row
                // const nextRow = rowsData[i + 1];
                // const { color, description } = handleDesc(nextRow[indexOfDesciption])
                // category[name].push({
                //     name,
                //     code: nextRow[indexOfCode],
                //     description,
                //     dimension: nextRow[indexOfDimension],
                //     qty: nextRow[indexOfQty],
                //     weight: nextRow[indexOfWeight],
                //     pkgCapacity: nextRow[indexOfCapacity],
                //     price: nextRow[indexOfPrice],
                //     color
                // });

                // // Skip the next row in the iteration
                // skipNextRow = true;
                continue
            }
            const { color, description } = handleDesc(row[indexOfDesciption])

            category[name].push({
                name,
                code: row[indexOfCode],
                description,
                dimension: row[indexOfDimension],
                qty: row[indexOfQty],
                weight: row[indexOfWeight],
                pkgCapacity: row[indexOfCapacity],
                price: row[indexOfPrice],
                color

            });

        }
        return category
    }

    async processImportedFile(file: Express.Multer.File) {
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.load(file.buffer);
        const worksheet = workbook.worksheets[0]; // Assuming the data is in the first worksheet

        const rows = worksheet.getSheetValues();

        // console.log(rows.length);
        // console.log(rows[144]);
        let objects = this.extractData(rows)
        // console.log(objects.length);

        try {
            // console.log(dataToSave);
            const data = objects
            const savedData = await this.productRepo.createFromExcel(data);
            return {
                savedData
            };
        } catch (error) {
            throw error
        }
    }

    async findAllPag(query) {
        try {
            const product = await this.productRepo.getAllPaginated(query)
            return product
        } catch (error) {
            throw error
        }
    }

    async findAll() {
        try {
            const product = await this.productRepo.getAll()
            return product
        } catch (error) {
            throw error
        }
    }

    async getAllCategories() {
        try {
            const categories = await this.productRepo.getCategories()
            return categories
        } catch (error) {
            throw error
        }
    }

    async findOne(id: string) {
        try {
            const product = await this.productRepo.getByID(id)
            return product
        } catch (error) {
            throw error
        }
    }

    async update(id: string, updateProductDto: UpdateProductDto) {
        try {
            const product = await this.productRepo.update(id, updateProductDto)
            return product
        } catch (error) {
            throw error
        }
    }

    async removeMany() {
        try {
            const product = await this.productRepo.deleteMany()
            return product
        } catch (error) {
            throw error
        }
    }

    async remove(id: string) {
        try {
            const product = await this.productRepo.delete(id)
            return product
        } catch (error) {
            throw error
        }
    }
}
