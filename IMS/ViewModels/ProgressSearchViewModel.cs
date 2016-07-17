using IMS.Models;
using LinqKit;
using System;
using System.Collections.Generic;
using System.Linq.Expressions;

namespace IMS.ViewModels
{
    public class ProgressSearchViewModel
    {
        public List<int> NoticeIds { get; set; }
        public List<int> RecruitStatusCodes { get; set; }

        public ProgressSearchViewModel() {
            this.NoticeIds = new List<int>();
            this.RecruitStatusCodes = new List<int>();
        }

        public Expression<Func<Invitation, bool>> NoticeIdPredicate
        {
            get
            {
                var predicate = PredicateBuilder.False<Invitation>();
                foreach (int id in NoticeIds)
                {
                    predicate = predicate.Or(p => p.TemplateId==id);
                }
                return predicate;
             
            }
        }

        public Expression<Func<Invitation, bool>> RecruitStatusCodePredicate
        {
            get
            {
                var predicate = PredicateBuilder.False<Invitation>();
                foreach (int id in RecruitStatusCodes)
                {
                predicate = predicate.Or(p => p.RecruitStatusType.Code == id);
                }
                return predicate;
            }
        }

    }
}