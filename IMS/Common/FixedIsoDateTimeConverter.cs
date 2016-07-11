using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;

namespace IMS.Common
{
    public class FixedIsoDateTimeConverter : IsoDateTimeConverter
    {
        private static readonly JsonConverter Converter = new IsoDateTimeConverter { DateTimeFormat = "yyyy'-'MM'-'dd'T'HH':'mm':'ss.fff'Z'" };

        public override void WriteJson(JsonWriter writer, object value, JsonSerializer serializer)
        {
            var date = (DateTime)value;
            var json = JsonConvert.SerializeObject(date, Converter);
            writer.WriteRawValue(json);
        }
    }
}