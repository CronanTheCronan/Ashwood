using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithCategoriesSpecification : BaseSpecification<Product>
    {
        public ProductsWithCategoriesSpecification(ProductSpecParams productParams)
        : base(x => 
            (string.IsNullOrEmpty(productParams.Search) || x.Name.ToLower().Contains(productParams.Search)) &&
            (!productParams.CategoryId.HasValue || x.ProductCategoryId == productParams.CategoryId)
          )
        {
            AddInclude(x => x.ProductCategory);
            AddOrderBy(x => x.Name);
            ApplyPaging(productParams.PageSize * (productParams.PageIndex - 1), productParams.PageSize);

            if (!string.IsNullOrEmpty(productParams.Sort))
            {
                switch (productParams.Sort)
                {
                    case "priceAsc":
                        AddOrderBy(p => p.Price);
                        break;
                    case "priceDesc":
                        AddOrderByDesc(p => p.Price);
                        break;
                    default:
                        AddOrderBy(n => n.Name);
                        break;
                }
            }
        }

        public ProductsWithCategoriesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductCategory);
        }
    }
}