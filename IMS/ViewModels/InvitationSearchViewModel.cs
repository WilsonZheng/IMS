using IMS.Models;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace IMS.ViewModels
{
    public class InvitationSearchViewModel
    {
        public List<int> RecruitStatusTypeIds { get; set; }
        public Expression<Func<Invitation, bool>> RecruitStatusTypeIdsPredicate
        {
            get
            {
                var prdCodes = PredicateBuilder.False<Invitation>();
                if (RecruitStatusTypeIds != null)
                {
                    foreach (int id in RecruitStatusTypeIds)
                    {
                        prdCodes = prdCodes.Or(p => p.RecruitStatusType.Code == id);
                    }
                }
                return prdCodes;
            }
        }


    }
}