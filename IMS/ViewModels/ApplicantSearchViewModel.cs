using IMS.Models;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace IMS.ViewModels
{
    public class ApplicantSearchViewModel
    {
        public List<int> RecruitStatusTypeIds { get; set; }
        public Expression<Func<Applicant,bool>> RecruitStatusTypeIdsPredicate{
            get{
                var prdCodes = PredicateBuilder.False<Applicant>();
                if (RecruitStatusTypeIds != null)
                {
                    foreach (int id in RecruitStatusTypeIds)
                    {
                        //prdCodes = prdCodes.Or(p => p.RecruitStatusType.Code == id);
                    }
                }
                return prdCodes;
            }
        }
    }
}