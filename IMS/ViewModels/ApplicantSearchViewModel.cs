using IMS.Models;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace IMS.ViewModels
{
    public class ApplicantSearchViewModel
    {
        public List<int> RecruitStatusCodes { get; set; }
        public Expression<Func<Applicant,bool>> RecruitStatusCodesPredicate{
            get{
                var prdCodes = PredicateBuilder.False<Applicant>();
                if (RecruitStatusCodes != null)
                {
                    foreach (int code in RecruitStatusCodes)
                    {
                        prdCodes = prdCodes.Or(p => p.RecruitStatusTypeId == code);
                    }
                }
                return prdCodes;
            }
        }
    }
}