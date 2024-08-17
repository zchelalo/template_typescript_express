type NewMeta = {
  page: number;
  perPage: number;
  total: number;
  pagLimitDef: number;
}

export class Meta {
  public page: number;
  public perPage: number;
  public pageCount: number;
  public totalCount: number;

  constructor({ page, perPage, total, pagLimitDef }: NewMeta) {
    this.page = page
    this.totalCount = total
  
    this.perPage = perPage > 0 ? perPage : pagLimitDef
  
    this.pageCount = total >= 0 ? Math.ceil(total / this.perPage) : 0
  
    if (this.page < 1) {
      this.page = 1
    } else if (this.page > this.pageCount) {
      this.page = this.pageCount
    }
  }

  public getOffset(): number {
    return (this.page - 1) * this.perPage
  }

  public getLimit(): number {
    return this.perPage
  }
}