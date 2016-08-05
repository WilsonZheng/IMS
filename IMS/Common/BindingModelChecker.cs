using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace IMS.Common
{
    public class BindingModelChecker
    {

        public static List<ImsErrorMessage> CheckModelState(ModelStateDictionary dic)
        {
            if (!dic.IsValid)
            {
                var errors = new List<ImsErrorMessage>();
                foreach (var state in dic.ToList())
                {

                    foreach (var error in state.Value.Errors.ToList())
                    {
                        errors.Add(new ImsErrorMessage() { FieldName = state.Key, ErrorMessage = error.ErrorMessage });
                    }
                }
                return errors;
            }
            else
            {
                return null;
            }

        }




    }
}