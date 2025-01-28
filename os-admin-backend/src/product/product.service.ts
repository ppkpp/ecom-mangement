import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/category/entities/category.entity';
import { SearchProductDto } from './dto/search-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const { categoryId, ...productData } = createProductDto;

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new Error('Category not found.');
    }

    const product = this.productRepository.create({
      ...productData,
      category,
    });

    return await this.productRepository.save(product);
  }

  async findAll() {
    return await this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.category', 'category')
      .select(['product', 'category.name'])
      .getMany();
  }

  async paginate(page: number, limit: number) {
    const [data, total] = await this.productRepository.findAndCount({
      relations: ['category'],
      skip: (page - 1) * limit,
      take: limit,
    });

    return {
      data,
      meta: {
        total,
        page,
        pageSize: limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  findOne(id: number) {
    return this.productRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { categoryId, ...productData } = updateProductDto;
    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });
    if (!category) {
      throw new Error('Category not found.');
    }
    const product = await this.productRepository.findOne({ where: { id } });

    if (!category) {
      throw new Error('Category not found.');
    }

    if (!product) {
      throw new NotFoundException();
    }
    product.category = category;
    Object.assign(product, updateProductDto);
    return await this.productRepository.save(product);
  }

  async remove(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException();
    }
    return await this.productRepository.remove(product);
  }

  async searchProducts(searchParams: SearchProductDto) {
    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (searchParams.searchTerm) {
      queryBuilder.andWhere('product.name ILIKE :searchTerm', {
        searchTerm: `%${searchParams.searchTerm}%`,
      });
    }

    if (searchParams.minPrice !== undefined) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: searchParams.minPrice,
      });
    }

    if (searchParams.maxPrice !== undefined) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: searchParams.maxPrice,
      });
    }

    if (searchParams.minStock !== undefined) {
      queryBuilder.andWhere('product.stock >= :minStock', {
        minStock: searchParams.minStock,
      });
    }

    if (searchParams.maxStock !== undefined) {
      queryBuilder.andWhere('product.stock <= :maxStock', {
        maxStock: searchParams.maxStock,
      });
    }

    const page = searchParams.page || 1;
    const limit = searchParams.limit || 8;
    const offset = (page - 1) * limit;

    const [products, total] = await queryBuilder
      .skip(offset)
      .take(limit)
      .getManyAndCount();

    return {
      data: products,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}
