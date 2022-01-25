using System;
using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications
{
    public class ProductsWithCategoriesSpecification : BaseSpecification<Product>
    {
        public ProductsWithCategoriesSpecification()
        {
            AddInclude(x => x.ProductCategory);
        }

        public ProductsWithCategoriesSpecification(int id) : base(x => x.Id == id)
        {
            AddInclude(x => x.ProductCategory);
        }
    }
}